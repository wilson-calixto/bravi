import app.schemas as schemas, app.models as models
from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException, status, APIRouter
from app.database import get_db

router = APIRouter()


@router.get("/", status_code=status.HTTP_200_OK)
def get_users(
    db: Session = Depends(get_db), limit: int = 10, page: int = 1, search: str = ""
):
    skip = (page - 1) * limit

    users = (
        db.query(models.User)
        .filter(models.User.firstName.contains(search))
        .limit(limit)
        .offset(skip)
        .all()
    )
    return {"status": "Success", "Results": len(users), "Users": users}


@router.post("/", status_code=status.HTTP_201_CREATED)
def create_user(payload: schemas.UserBaseSchema, db: Session = Depends(get_db)):
    new_user = models.User(**payload.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"status": "Success", "User": new_user, "message": "User created successfully"}


@router.patch("/{user_id}", status_code=status.HTTP_202_ACCEPTED)
def update_user(
    user_id: int, payload: schemas.UserBaseSchema, db: Session = Depends(get_db)
):
    user_query = db.query(models.User).filter(models.User.id == user_id)
    db_user = user_query.first()

    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No User with this id: {user_id} found",
        )
    update_data = payload.dict(exclude_unset=True)
    user_query.filter(models.User.id == user_id).update(
        update_data, synchronize_session=False
    )
    db.commit()
    db.refresh(db_user)
    return {"status": "Success", "User": db_user, "message": "User updated successfully"}


@router.get("/{user_id}", status_code=status.HTTP_200_OK)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No User with this id: `{user_id}` found",
        )
    return {"status": "Success", "User": user}


@router.delete("/{user_id}", status_code=status.HTTP_200_OK)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user_query = db.query(models.User).filter(models.User.id == user_id)
    user = user_query.first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No user with this id: {user_id} found",
        )
    user_query.delete(synchronize_session=False)
    db.commit()
    return {"status": "Success", "message": "User deleted successfully"}
