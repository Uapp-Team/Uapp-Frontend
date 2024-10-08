import React from 'react';

const StarRatings = ({star}) => {

  console.log('Star', star)

    const Stars = Array.from({length: 5}, (elem, index) => {
      let number = index + 0.5;
      let number1 = index + 0.6;
      return <span>
        {
            star >= index + 1 || star >= number1 ? <i style={{color: "#1e98b0", fontSize: "15px"}} class="fas fa-star"></i> 
            : star >= number ? <i style={{color: "#1e98b0", fontSize: "15px"}} class="fas fa-star-half-alt"></i>
            : <i style={{color: "#1e98b0", fontSize: "15px"}} class="far fa-star"></i>
        }
      </span>
    });

    return (
        <div>
            {Stars}
        </div>
    );
};

export default StarRatings;