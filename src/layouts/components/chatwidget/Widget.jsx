/* eslint-disable jsx-a11y/iframe-has-title */

import React, { useEffect, useRef, useState } from "react";
import "./widget.css"
// Animation durations and delays
const ANIMATION_DURATION = 5000; // 5 seconds per text

const texts = [
  { text: "Connect", animation: "showFirst" },
  { text: "ChatUAPP", animation: "showSecond" },
  { text: "AI System", animation: "showThird" },
];

const Widget = () => {
  const currentUser = JSON?.parse(localStorage.getItem("current_user"));
  // Changes Here Start
  const name = currentUser?.displayName;
  const email = currentUser?.displayEmail;
  const consultantsName = "";
  const destinationCountry = "";
  const domainUrl = "http://chatuapp.ddns.net:90/";
  const __key = "hDMEL3lFlwv7dK7SZKgXoTOq8QevROqyIGr6IoJz7qkQPVh7ha";
  const __tenant = "Default";
  const url = `${domainUrl}echat?name=${encodeURIComponent(
    name
  )}&email=${encodeURIComponent(email)}&consultantsName=${encodeURIComponent(
    consultantsName
  )}&destinationCountry=${encodeURIComponent(
    destinationCountry
  )}&__key=${encodeURIComponent(__key)}&__tenant=${encodeURIComponent(
    __tenant
  )}`;
  // Changes Here End

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % texts.length);
    }, ANIMATION_DURATION);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <>
      {isOpen && (
        <>
          <div
            style={{
              zIndex: 999999999999999999,
              width: "410px",
              right: "70px",
              bottom: "100px",
              position: "fixed",
              backgroundColor: "white",
              height: "calc(100vh - 120px)",
              maxHeight: "650px",
              borderRadius: '16px',
              boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
            }}
          >
            <iframe className="widget-iframe" src={url} width="100%" height="100%"></iframe>
          </div>
        </>
      )}

      <button
        className="animated-btn"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="20"
            viewBox="0 0 19 20"
            fill="none"
          >
            <g filter="url(#filter0_i_2790_10487)">
              <path
                d="M7.39755 3.84641C7.52487 3.04067 8.2537 2.42289 9.1341 2.42289C10.0145 2.42289 10.6964 3.00206 10.856 3.77046C10.8783 3.8764 10.8898 3.98586 10.8898 4.09818V7.00425H10.3981L10.3786 8.10005L12.9531 8.97949V4.0985C12.9531 3.85885 12.9289 3.62463 12.8823 3.39807C12.8395 3.18714 12.7776 2.9826 12.6978 2.78667C12.1461 1.42218 10.7583 0.454348 9.13347 0.454348C7.50859 0.454348 6.06083 1.46462 5.53431 2.87602L7.39755 3.84641Z"
                fill="url(#paint0_linear_2790_10487)"
              />
            </g>
            <path
              d="M7.39755 3.84641C7.52487 3.04067 8.2537 2.42289 9.1341 2.42289C10.0145 2.42289 10.6964 3.00206 10.856 3.77046C10.8783 3.8764 10.8898 3.98586 10.8898 4.09818V7.00425H10.3981L10.3786 8.10005L12.9531 8.97949V4.0985C12.9531 3.85885 12.9289 3.62463 12.8823 3.39807C12.8395 3.18714 12.7776 2.9826 12.6978 2.78667C12.1461 1.42218 10.7583 0.454348 9.13347 0.454348C7.50859 0.454348 6.06083 1.46462 5.53431 2.87602L7.39755 3.84641Z"
              stroke="#D6F2ED"
              strokeOpacity="0.09"
              strokeWidth="0.5"
              strokeMiterlimit="10"
              style={{ mixBlendMode: "overlay" }}
            />
            <g filter="url(#filter1_i_2790_10487)">
              <path
                d="M1.23919 9.59473L3.01181 8.46606C2.37711 7.95326 2.20639 7.01319 2.64675 6.25085C3.07307 5.51245 3.92954 5.18696 4.67465 5.43267C4.77772 5.46682 4.87824 5.51149 4.97556 5.56765L5.31285 5.7623L7.49233 7.02084L7.2463 7.44685L8.18574 8.01102L10.2344 6.22149L6.00754 3.781C5.80012 3.66133 5.58505 3.56528 5.36583 3.49189C5.16128 3.4236 4.95323 3.37542 4.74358 3.34606C3.28591 3.14215 1.7539 3.86013 0.941786 5.26674C0.111799 6.70429 0.280286 8.43287 1.23919 9.59473Z"
                fill="url(#paint1_linear_2790_10487)"
              />
            </g>
            <path
              d="M1.23919 9.59473L3.01181 8.46606C2.37711 7.95326 2.20639 7.01319 2.64675 6.25085C3.07307 5.51245 3.92954 5.18696 4.67465 5.43267C4.77772 5.46682 4.87824 5.51149 4.97556 5.56765L5.31285 5.7623L7.49233 7.02084L7.2463 7.44685L8.18574 8.01102L10.2344 6.22149L6.00754 3.781C5.80012 3.66133 5.58505 3.56528 5.36583 3.49189C5.16128 3.4236 4.95323 3.37542 4.74358 3.34606C3.28591 3.14215 1.7539 3.86013 0.941786 5.26674C0.111799 6.70429 0.280286 8.43287 1.23919 9.59473Z"
              stroke="#D6F2ED"
              strokeOpacity="0.09"
              strokeWidth="0.5"
              strokeMiterlimit="10"
              style={{ mixBlendMode: "overlay" }}
            />
            <g filter="url(#filter2_i_2790_10487)">
              <path
                d="M1.009 14.7666C1.83899 16.2041 3.42014 16.9224 4.90556 16.6729L4.81462 14.5735C4.05292 14.8668 3.15401 14.5445 2.71365 13.7821C2.28733 13.0437 2.4338 12.1391 3.01935 11.6167C3.10008 11.5446 3.18943 11.4798 3.28644 11.4236L3.62373 11.229L5.8032 9.97077L6.04923 10.3968L7.00749 9.86514H7.00781L6.48225 7.19617L2.2551 9.63667C2.04768 9.75633 1.85686 9.8945 1.6839 10.048C1.52276 10.1906 1.37661 10.3467 1.24641 10.5136C0.340801 11.6738 0.196886 13.3596 1.009 14.7666Z"
                fill="url(#paint2_linear_2790_10487)"
              />
            </g>
            <path
              d="M1.009 14.7666C1.83899 16.2041 3.42014 16.9224 4.90556 16.6729L4.81462 14.5735C4.05292 14.8668 3.15401 14.5445 2.71365 13.7821C2.28733 13.0437 2.4338 12.1391 3.01935 11.6167C3.10008 11.5446 3.18943 11.4798 3.28644 11.4236L3.62373 11.229L5.8032 9.97077L6.04923 10.3968L7.00749 9.86514H7.00781L6.48225 7.19617L2.2551 9.63667C2.04768 9.75633 1.85686 9.8945 1.6839 10.048C1.52276 10.1906 1.37661 10.3467 1.24641 10.5136C0.340801 11.6738 0.196886 13.3596 1.009 14.7666Z"
              stroke="#D6F2ED"
              strokeOpacity="0.09"
              strokeWidth="0.5"
              strokeMiterlimit="10"
              style={{ mixBlendMode: "overlay" }}
            />
            <g filter="url(#filter3_i_2790_10487)">
              <path
                d="M5.45618 15.81V10.929L8.03038 11.8084L8.01156 12.9042H7.5195V15.8103C7.5195 15.9226 7.53099 16.032 7.55333 16.138C7.71288 16.9064 8.42288 17.4856 9.27552 17.4856C10.1282 17.4856 10.8844 16.8678 11.0118 16.0617L12.875 17.0321C12.3488 18.4435 10.9361 19.4541 9.27584 19.4541C7.61555 19.4541 6.26351 18.4863 5.71147 17.1221C5.63201 16.9259 5.56978 16.7213 5.52702 16.5104C5.48043 16.2835 5.45618 16.0496 5.45618 15.81Z"
                fill="url(#paint3_linear_2790_10487)"
              />
            </g>
            <path
              d="M5.45618 15.81V10.929L8.03038 11.8084L8.01156 12.9042H7.5195V15.8103C7.5195 15.9226 7.53099 16.032 7.55333 16.138C7.71288 16.9064 8.42288 17.4856 9.27552 17.4856C10.1282 17.4856 10.8844 16.8678 11.0118 16.0617L12.875 17.0321C12.3488 18.4435 10.9361 19.4541 9.27584 19.4541C7.61555 19.4541 6.26351 18.4863 5.71147 17.1221C5.63201 16.9259 5.56978 16.7213 5.52702 16.5104C5.48043 16.2835 5.45618 16.0496 5.45618 15.81Z"
              stroke="#D6F2ED"
              strokeOpacity="0.09"
              strokeWidth="0.5"
              strokeMiterlimit="10"
              style={{ mixBlendMode: "overlay" }}
            />
            <g filter="url(#filter4_i_2790_10487)">
              <path
                d="M12.4008 16.1272C12.6082 16.2469 12.823 16.3429 13.0422 16.4163C13.2464 16.4846 13.4548 16.5331 13.6644 16.5624C15.1221 16.7667 16.6541 16.0484 17.4665 14.6414C18.2965 13.2039 18.128 11.4753 17.1691 10.3138L15.3965 11.4424C16.0312 11.9552 16.2019 12.8953 15.7616 13.6577C15.3353 14.3957 14.4788 14.7212 13.7334 14.4755C13.6306 14.4417 13.5298 14.397 13.4328 14.3409L13.0952 14.1459L10.916 12.8877L11.162 12.4617L10.2226 11.8975L8.17364 13.687L12.4008 16.1272Z"
                fill="url(#paint4_linear_2790_10487)"
              />
            </g>
            <path
              d="M12.4008 16.1272C12.6082 16.2469 12.823 16.3429 13.0422 16.4163C13.2464 16.4846 13.4548 16.5331 13.6644 16.5624C15.1221 16.7667 16.6541 16.0484 17.4665 14.6414C18.2965 13.2039 18.128 11.4753 17.1691 10.3138L15.3965 11.4424C16.0312 11.9552 16.2019 12.8953 15.7616 13.6577C15.3353 14.3957 14.4788 14.7212 13.7334 14.4755C13.6306 14.4417 13.5298 14.397 13.4328 14.3409L13.0952 14.1459L10.916 12.8877L11.162 12.4617L10.2226 11.8975L8.17364 13.687L12.4008 16.1272Z"
              stroke="#D6F2ED"
              strokeOpacity="0.09"
              strokeWidth="0.5"
              strokeMiterlimit="10"
              style={{ mixBlendMode: "overlay" }}
            />
            <g filter="url(#filter5_i_2790_10487)">
              <path
                d="M11.3977 10.0423L12.3563 9.51066L12.602 9.93666L14.7815 8.67844L15.1191 8.48347C15.2161 8.4273 15.3055 8.36253 15.3862 8.29073C15.9717 7.76804 16.1182 6.86338 15.6919 6.1253C15.2515 5.36296 14.3523 5.04067 13.5906 5.33392L13.4996 3.23423C14.9851 2.98501 16.5662 3.70299 17.3962 5.14055C18.2086 6.54747 18.0644 8.23361 17.1588 9.39387C17.0286 9.56076 16.8825 9.7168 16.7213 9.85944C16.548 10.0129 16.3575 10.1511 16.1501 10.2708L11.9233 12.7109L11.3977 10.0423Z"
                fill="url(#paint5_linear_2790_10487)"
              />
            </g>
            <path
              d="M11.3977 10.0423L12.3563 9.51066L12.602 9.93666L14.7815 8.67844L15.1191 8.48347C15.2161 8.4273 15.3055 8.36253 15.3862 8.29073C15.9717 7.76804 16.1182 6.86338 15.6919 6.1253C15.2515 5.36296 14.3523 5.04067 13.5906 5.33392L13.4996 3.23423C14.9851 2.98501 16.5662 3.70299 17.3962 5.14055C18.2086 6.54747 18.0644 8.23361 17.1588 9.39387C17.0286 9.56076 16.8825 9.7168 16.7213 9.85944C16.548 10.0129 16.3575 10.1511 16.1501 10.2708L11.9233 12.7109L11.3977 10.0423Z"
              stroke="#D6F2ED"
              strokeOpacity="0.09"
              strokeWidth="0.5"
              strokeMiterlimit="10"
              style={{ mixBlendMode: "overlay" }}
            />
            <defs>
              <filter
                id="filter0_i_2790_10487"
                x="5.22656"
                y="0.204102"
                width="8.97656"
                height="10.125"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dx="1" dy="1" />
                <feGaussianBlur stdDeviation="0.5" />
                <feComposite
                  in2="hardAlpha"
                  operator="arithmetic"
                  k2="-1"
                  k3="1"
                />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.274129 0 0 0 0 0.597791 0 0 0 0 0.52227 0 0 0 0.19 0"
                />
                <feBlend
                  mode="normal"
                  in2="shape"
                  result="effect1_innerShadow_2790_10487"
                />
              </filter>
              <filter
                id="filter1_i_2790_10487"
                x="0.15625"
                y="3.06152"
                width="11.5078"
                height="7.8623"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dx="1" dy="1" />
                <feGaussianBlur stdDeviation="0.5" />
                <feComposite
                  in2="hardAlpha"
                  operator="arithmetic"
                  k2="-1"
                  k3="1"
                />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.274129 0 0 0 0 0.597791 0 0 0 0 0.52227 0 0 0 0.19 0"
                />
                <feBlend
                  mode="normal"
                  in2="shape"
                  result="effect1_innerShadow_2790_10487"
                />
              </filter>
              <filter
                id="filter2_i_2790_10487"
                x="0.226562"
                y="6.80469"
                width="8.08594"
                height="11.167"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dx="1" dy="1" />
                <feGaussianBlur stdDeviation="0.5" />
                <feComposite
                  in2="hardAlpha"
                  operator="arithmetic"
                  k2="-1"
                  k3="1"
                />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.274129 0 0 0 0 0.597791 0 0 0 0 0.52227 0 0 0 0.19 0"
                />
                <feBlend
                  mode="normal"
                  in2="shape"
                  result="effect1_innerShadow_2790_10487"
                />
              </filter>
              <filter
                id="filter3_i_2790_10487"
                x="5.20312"
                y="10.5791"
                width="8.98438"
                height="10.125"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dx="1" dy="1" />
                <feGaussianBlur stdDeviation="0.5" />
                <feComposite
                  in2="hardAlpha"
                  operator="arithmetic"
                  k2="-1"
                  k3="1"
                />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.274129 0 0 0 0 0.597791 0 0 0 0 0.52227 0 0 0 0.19 0"
                />
                <feBlend
                  mode="normal"
                  in2="shape"
                  result="effect1_innerShadow_2790_10487"
                />
              </filter>
              <filter
                id="filter4_i_2790_10487"
                x="7.74219"
                y="9.98438"
                width="11.5078"
                height="7.8623"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dx="1" dy="1" />
                <feGaussianBlur stdDeviation="0.5" />
                <feComposite
                  in2="hardAlpha"
                  operator="arithmetic"
                  k2="-1"
                  k3="1"
                />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.274129 0 0 0 0 0.597791 0 0 0 0 0.52227 0 0 0 0.19 0"
                />
                <feBlend
                  mode="normal"
                  in2="shape"
                  result="effect1_innerShadow_2790_10487"
                />
              </filter>
              <filter
                id="filter5_i_2790_10487"
                x="11.1172"
                y="2.93555"
                width="8.0625"
                height="11.167"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dx="1" dy="1" />
                <feGaussianBlur stdDeviation="0.5" />
                <feComposite
                  in2="hardAlpha"
                  operator="arithmetic"
                  k2="-1"
                  k3="1"
                />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.274129 0 0 0 0 0.597791 0 0 0 0 0.52227 0 0 0 0.19 0"
                />
                <feBlend
                  mode="normal"
                  in2="shape"
                  result="effect1_innerShadow_2790_10487"
                />
              </filter>
              <linearGradient
                id="paint0_linear_2790_10487"
                x1="8.34417"
                y1="7.87232"
                x2="12.9531"
                y2="3.95901"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#045D5E" />
                <stop offset="1" stopColor="#08C4A5" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_2790_10487"
                x1="6.98207"
                y1="9.8796"
                x2="6.11639"
                y2="3.75689"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#045D5E" />
                <stop offset="1" stopColor="#08C4A5" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_2790_10487"
                x1="8.03228"
                y1="11.7469"
                x2="2.16732"
                y2="9.89589"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#045D5E" />
                <stop offset="1" stopColor="#08C4A5" />
              </linearGradient>
              <linearGradient
                id="paint3_linear_2790_10487"
                x1="10.128"
                y1="11.9447"
                x2="5.45618"
                y2="16.0795"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#045D5E" />
                <stop offset="1" stopColor="#08C4A5" />
              </linearGradient>
              <linearGradient
                id="paint4_linear_2790_10487"
                x1="12.4245"
                y1="15.9032"
                x2="11.6181"
                y2="10.0209"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#08C4A5" />
                <stop offset="1" stopColor="#045D5E" />
              </linearGradient>
              <linearGradient
                id="paint5_linear_2790_10487"
                x1="10.5213"
                y1="8.17793"
                x2="16.1954"
                y2="9.96931"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#045D5E" />
                <stop offset="1" stopColor="#08C4A5" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div
          className="text-wrapper"
          style={{
            position: "relative",
            width:
              activeIndex === 0
                ? "70px"
                : activeIndex === 1
                  ? "100px"
                  : "130px",
            transition: "width 1s ease-in-out",
          }}
        >
          {texts.map((item, idx) => (
            <span
              key={item.text}
              className={`widget-animated-span ${item.animation} ${activeIndex === idx ? "active" : ""
                }`}
              style={{
                position: "absolute",
                width: "100%",
                textAlign: "left",
                opacity: activeIndex === idx ? 1 : 0,
                pointerEvents: "none",
                transition: "opacity 0.5s",
                // Animation handled by CSS below
              }}
            >
              <span
                style={{
                  display: "block !important",
                }}
              >
                <span
                  style={{
                    color: "#495057",
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontStyle: "italic",
                    fontWeight: 300,
                  }}
                >
                  {activeIndex === 0
                    ? ""
                    : activeIndex === 1
                      ? "Ask"
                      : "Connect"}
                </span>
                <span>&nbsp;</span>
                <span
                  style={{
                    color: "#045D5E",
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 500,
                  }}
                >
                  ChatUAPP
                </span>
              </span>
            </span>
          ))}
        </div>
      </button>
    </>
  );
};

export default Widget;
