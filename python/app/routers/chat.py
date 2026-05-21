from typing import Annotated

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import ChatMessage, User
from ..schemas import ChatRequest, ChatResponse
from ..security import get_current_user

router = APIRouter(tags=["chat"])


def build_chatbot_response(message: str) -> str:
    normalized = message.lower()
    if "appeal" in normalized and "status" in normalized:
        return "I can help you review your appeal status. Please provide the appeal ID or the submission date."
    if "deadline" in normalized or "due date" in normalized:
        return "Appeal deadlines are time-sensitive. Share the notice date and appeal type so we can estimate the next steps."
    if "document" in normalized or "evidence" in normalized:
        return "For most appeals, gather the decision letter, supporting evidence, dates, and any previous correspondence."
    return "Thanks for sharing that. Tell me a little more about the appeal decision, timeline, and what outcome you want."


@router.post(
    "/chat",
    response_model=ChatResponse,
    status_code=status.HTTP_201_CREATED,
)
def chat(
    payload: ChatRequest,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[Session, Depends(get_db)],
):
    response = build_chatbot_response(payload.message)
    chat_message = ChatMessage(
        user_id=current_user.id,
        message=payload.message,
        response=response,
    )
    db.add(chat_message)
    db.commit()
    db.refresh(chat_message)
    return chat_message


@router.get("/history", response_model=list[ChatResponse])
def history(
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[Session, Depends(get_db)],
    limit: Annotated[int, Query(ge=1, le=100)] = 50,
    offset: Annotated[int, Query(ge=0)] = 0,
):
    return (
        db.query(ChatMessage)
        .filter(ChatMessage.user_id == current_user.id)
        .order_by(ChatMessage.created_at.desc())
        .offset(offset)
        .limit(limit)
        .all()
    )
