import React from "react";

const SocialShare = ({ description, url }) => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center mt-3 mb-3">
        {/* <h3
          className=" mr-2"
          style={{
            color: "#404f4e",
            fontSize: "16px",
            fontWeight: 700,
            margin: "0px",
          }}
        >
          Share on
        </h3> */}

        <div className="">
          {/* Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${url}&text=${encodeURI(
              description
            )}`}
            target="blank"
          >
            <i
              class="fa-brands fa-facebook-f mx-1 facebook-color"
              size={20}
            ></i>
          </a>

          {/* Twitter */}
          <a
            href={`https://twitter.com/intent/tweet?url=${url}&text=${encodeURI(
              description
            )}`}
            target="blank"
          >
            <i class="fa-brands fa-twitter mx-1 twitter-color" size={20}></i>
          </a>

          {/* Pintrest */}
          <a
            href={`https://pinterest.com/pin/create/button/?url=${url}&media=&description=${encodeURI(
              description
            )}`}
            target="blank"
          >
            <i
              class="fa-brands fa-pinterest-p mx-1 pinterest-color"
              size={20}
            ></i>
          </a>

          {/* linkedIn */}
          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}`}
            target="blank"
          >
            <i class="fab fa-linkedin-in mx-1 linkedIn-color" size={20}></i>
          </a>
        </div>
      </div>
    </>
  );
};

export default SocialShare;
