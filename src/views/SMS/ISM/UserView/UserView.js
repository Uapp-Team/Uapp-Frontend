import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import ismhero from "../../../../assets/img/ismhero.png";
import DefaultDropdownU from "../../../../components/Dropdown/DefaultDropdownU";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import Typing from "../../../../components/form/Typing";
import { Card, CardBody, Col, Row } from "reactstrap";
import UserViewAns from "./UserViewAns";
import Uget from "../../../../helpers/Uget";

const UserView = () => {
  const [noFilter, setNoFilter] = useState(true);
  const [uniLable, setUniLable] = useState("Select University");
  const [uniValue, setUniValue] = useState(0);
  const [uniModal, setUniModal] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [categoryName, setCategoryName] = useState("");
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    Uget(`QuestionCategory/get-all`).then((res) => {
      setCategory(res?.data);
    });
  }, []);
  console.log(category);
  useEffect(() => {
    keyword === "" && categoryId === 0 ? setNoFilter(true) : setNoFilter(false);
  }, [categoryId, keyword]);
  return (
    <>
      <BreadCrumb title="Information Search" backTo="" path="/" />

      <Card>
        <CardBody>
          <div
            className="bg-cover-img py-5 text-center mb-5"
            style={{
              background: "url(" + ismhero + ")",
            }}
          >
            <h2 className="text-white fw-600">How can we help you?</h2>
            {noFilter && (
              <p className="text-white">
                Search or browse through the category below to find answers.
              </p>
            )}
            <div className="w-50 my-3 mx-auto">
              <Typing
                name=""
                placeholder="Search here ..."
                setValue={setKeyword}
                setIsTyping={setIsTyping}
                isIcon={true}
              />
            </div>

            {noFilter && (
              <div>
                {uniModal ? (
                  <div
                    className="w-50 mx-auto"
                    // onMouseLeave={() => setUniModal(!uniModal)}
                  >
                    <DefaultDropdownU
                      label={uniLable}
                      setLabel={setUniLable}
                      value={uniValue}
                      setValue={setUniValue}
                      url="University/get-dd"
                      className="w-100"
                    />
                  </div>
                ) : (
                  <p
                    className="text-white pointer"
                    onClick={() => setUniModal(!uniModal)}
                  >
                    University wise information <FaRegArrowAltCircleRight />
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="w-75 mx-auto">
            {noFilter ? (
              <Row>
                {category.map((item, i) => (
                  <>
                    {item?.subCategories[0]?.id && (
                      <Col xl={2} lg={3} md={4} xs={6} key={i}>
                        <div
                          onClick={() => {
                            setCategoryId(item?.subCategories[0]?.id);
                            setCategoryName(item?.subCategories[0]?.name);
                            setOpenIndex(item?.id);
                          }}
                          className="ism-category-card pointer"
                        >
                          {item?.name}
                        </div>
                      </Col>
                    )}
                  </>
                ))}
              </Row>
            ) : (
              <UserViewAns
                uniLable={uniLable}
                setUniLable={setUniLable}
                uniValue={uniValue}
                setUniValue={setUniValue}
                category={category}
                categoryName={categoryName}
                setCategoryName={setCategoryName}
                categoryId={categoryId}
                setCategoryId={setCategoryId}
                openIndex={openIndex}
                setOpenIndex={setOpenIndex}
              />
            )}
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default UserView;
