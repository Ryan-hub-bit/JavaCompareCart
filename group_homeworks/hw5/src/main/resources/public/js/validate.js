const validateCourse = () => {
    let name = document.querySelector("#courseName");
    if (name.value.length < 1) {
        alert("Course name cannot be empty!");
        return false;
    } else {
        return true;
    }
};

const validateReview =()=>{
    let rating = document.querySelector("#ratingId");
    if(rating.value<1 ||rating.value>5)
    {
        alert("Rating must be a value between 1 and 5 inclusive!")
        return false;
    }
    else{
        return true;
    }
}
