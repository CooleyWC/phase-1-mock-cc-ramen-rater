// write your code here
/*
-When the page loads - will need to get all the ramen objects (fetch)
-Display the images with img tags of #ramen-menu
-(for Each) append them to the appropriate div

-when an image is clicked, the info should be displayed inside a different div (ramen detail)
- instert info in the correct locations (see ids)


-submit event listener on the new-ramen form - the info should be added to the ramen-menu div
*/

const ramenMenuContainer = document.getElementById('ramen-menu');
const ramenForm = document.getElementById('new-ramen');

document.addEventListener('DOMContentLoaded', (e)=>{
    fetch(' http://localhost:3000/ramens', {
        method: "GET",
        headers: {
            "Content-type": "application/JSON",
            "Accept": "application/JSON"
        }
    })
    .then(res=>res.json())
    .then(ramenData=>{
        // console.log(ramenData);
        handleImages(ramenData);
    })
})

function handleImages(ramenData){
    ramenData.forEach(element=>{
        const ramenImage = document.createElement('img')
        ramenImage.src = element.image;
        ramenMenuContainer.append(ramenImage);
        let imgId = element.id;
        ramenImage.addEventListener('click', function (e){
            handleImageClick(element)
        })
    })
}

function handleImageClick(element){
    // console.log(element)
    let ramenName = document.querySelector('.name');
    ramenName.textContent = element.name;
    let ramenRestaurant = document.querySelector('.restaurant');
    ramenRestaurant.textContent = element.restaurant;
    let ramenRating = document.getElementById('rating-display');
    ramenRating.textContent = element.rating;
    let ramenComment = document.getElementById('comment-display');
    ramenComment.textContent = element.comment;
    let ramenImageSelect = document.querySelector('.detail-image');
    ramenImageSelect.src = element.image;
    console.log(ramenRating);
}

ramenForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    let newRamenObj = {
        name: e.target.name.value,
        restaurant: e.target.restaurant.value,
        image: e.target.image.value,
        rating: e.target.rating.value,
        comment: e.target['new-comment'].value
    }
    handleImages([newRamenObj]);
    console.log(newRamenObj)
})
