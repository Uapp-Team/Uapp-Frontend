import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "reactstrap";
import "./SearchAndApply.css";
import ResultsToolbar from "./components/ResultsToolbar";
import SearchBox from "./components/SearchBox";
import SearchFilters from "./components/SearchFilters";

function SearchAndApply() {
  const [isSticky, setIsSticky] = useState(false);
  const sentinelRef = useRef(null);
  const toolbarRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "-80px 0px 0px 0px",
        threshold: 0,
      }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, []);

  const categories = [
    [
      "Undergraduate",
      "Pre-Masters programme",
      "Postgraduate",
      "Short Course",
      "Pre-sessional English",
    ],
    [
      "Research degrees",
      "Pathway Programme",
      "Professional Course",
      "Diploma",
      "Secondary School",
    ],
    ["Higher Secondary School", "HND", "HNC", "Level 3", "Level 4", "Level 5"],
  ];

  const dates = [
    { label: "April 2025" },
    { label: "May 2025" },
    {
      label: "June 2025",
      options: ["June 2025", "July 2025", "August 2025"],
    },
  ];
  return (
    <>
      <Row className="mb-1">
        <Col md={6} className="d-flex h-40px">
          <SearchBox
            name="search"
            placeholder="Search"
            // value={search}
            // setValue={setSearch}
            // setIsTyping={setIsTyping}
            // university={university}
            // setUniversity={setUniversity}
            // universityOptions={["Harvard", "MIT", "Stanford"]}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <SearchFilters
            keyword="Search keyword"
            categories={categories}
            // selectedCategory={selectedCategory}
            // setSelectedCategory={setSelectedCategory}
            dates={dates}
            // selectedDate={selectedDate}
            // setSelectedDate={setSelectedDate}
          />
        </Col>
      </Row>
      <div ref={sentinelRef} style={{ height: 1 }} />

      <div
        ref={toolbarRef}
        className={`results-toolbar ${isSticky ? "sticky" : ""}`}
      >
        <ResultsToolbar />
      </div>

      {/* <div>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi nobis
        error veniam atque enim odio dolorem itaque officiis earum, alias
        doloribus quasi repellendus! Libero magni quidem tenetur blanditiis
        sequi quod dignissimos cupiditate, et, eos voluptates suscipit iusto.
        Iure nobis voluptate, consequuntur aspernatur maxime, architecto dicta
        dignissimos pariatur commodi ab adipisci repudiandae! Nulla maiores
        dolorum deleniti, ea a dignissimos ipsam est culpa rem. Asperiores illum
        sequi voluptate molestias, fugit, quae, animi ullam impedit sed ab
        inventore cumque incidunt fuga sint doloribus. Omnis nemo consequatur
        officiis itaque, corporis unde non ea quo doloremque perspiciatis magnam
        eum. Blanditiis quas repellat dolore, inventore corrupti sed. Non
        reiciendis sint voluptate voluptas nulla! Amet, minima? Ullam eveniet
        explicabo quo nemo dolores fuga, temporibus consequuntur sunt
        dignissimos minus, itaque soluta qui expedita accusantium beatae. Vel
        neque accusantium vero ex, inventore officia distinctio voluptates aut
        sapiente molestiae. Reprehenderit, odio ratione dignissimos praesentium
        molestiae sit maiores molestias dolores commodi? Exercitationem, debitis
        aspernatur saepe nihil iure magni doloremque placeat laudantium nostrum
        atque facilis, nam vero aliquid sit itaque reprehenderit. Ullam quia
        beatae ratione architecto qui labore porro, impedit eaque repellat
        molestias hic dolore ea, iure nam exercitationem ipsum doloribus tempora
        pariatur! Quibusdam adipisci est, alias laudantium dicta corrupti,
        beatae eaque sunt voluptas cumque deleniti blanditiis asperiores,
        obcaecati quidem ea quo ad facere distinctio. Rerum fugit maiores
        voluptates, magni perspiciatis expedita magnam numquam suscipit ipsum
        adipisci? Qui iste eligendi commodi quia obcaecati itaque natus
        voluptates odio illo, molestiae doloremque? Voluptates maiores magnam,
        optio laudantium, explicabo odit, incidunt iste vel neque id harum enim
        velit! Ratione dolores repellendus perspiciatis, voluptatum esse harum
        error laudantium, consectetur non debitis inventore reiciendis deleniti!
        Totam ipsa impedit explicabo soluta dolorem mollitia cum nam dignissimos
        tempora ad recusandae non sit ratione qui iure repellendus deleniti
        saepe possimus laboriosam sed, amet ex natus doloremque? Animi quisquam
        incidunt laboriosam optio illum rem est, deserunt ullam doloribus
        nostrum, ipsum voluptatem at, quae iste ex nihil? Rerum, perferendis?
        Deleniti reprehenderit assumenda reiciendis aperiam nulla odio sapiente
        explicabo ratione blanditiis. Sed voluptas dolor aspernatur tempore
        nihil expedita molestias laudantium perspiciatis aliquid velit? Officia
        cumque est sequi eius voluptates quisquam animi, debitis dolorum autem
        quo, molestiae suscipit, ad non nemo possimus commodi earum assumenda
        voluptas asperiores vel adipisci quam cupiditate? Excepturi explicabo
        numquam, id porro molestias quaerat facere est fugit? Harum eum sint
        praesentium qui nam dignissimos! Ex consequatur ipsum, odio impedit
        sequi voluptas odit? Ipsa odio aliquam qui perferendis temporibus
        expedita dignissimos illum repellendus voluptas consequatur, natus saepe
        officia in velit ab numquam eveniet aperiam, nulla veritatis
        consequuntur quis delectus quos earum! Distinctio dolore, omnis
        veritatis atque velit eveniet ducimus quia asperiores magni dignissimos,
        tempora dicta quibusdam voluptates accusantium enim totam vero! Harum
        vero et quae dolorum officia voluptates, recusandae eveniet, optio
        accusamus quis quo sit impedit molestias corporis quisquam odio? Quae
        cumque ullam deleniti et, quis nam blanditiis iste voluptatem iure
        accusantium facere repellat praesentium nulla consectetur accusamus
        corrupti pariatur reiciendis dolor quo delectus fugiat officiis!
        Necessitatibus quas esse consectetur culpa quaerat. Sapiente expedita
        aperiam, vero ullam facilis laboriosam excepturi itaque animi molestias
        voluptas, dolor facere assumenda quibusdam placeat beatae quaerat!
        Perspiciatis tempora dignissimos, quibusdam eum placeat ratione?
        Temporibus quam explicabo facere alias deleniti, culpa exercitationem a
        id minima aliquam quos dolor? Reprehenderit, libero ducimus, doloribus
        magni, pariatur sit vel delectus neque unde rem quas animi harum quis
        amet cum dolore possimus. Magnam soluta harum eius voluptatibus
        temporibus sequi. Ad officiis atque qui architecto repellat minima ex
        magnam tenetur? A facere quisquam atque voluptas nisi soluta fugit minus
        provident consequuntur necessitatibus sequi aut, voluptates impedit
        ipsam labore sapiente corrupti esse, animi, neque corporis eligendi
        maxime repudiandae. Itaque error earum porro molestiae id mollitia quo
        aspernatur optio necessitatibus minus, placeat voluptatem exercitationem
        ipsa assumenda consectetur hic officia provident magni dolorum dolores
        facilis fugit odit. Fugit nobis aliquid quasi voluptate mollitia sed,
        maxime ducimus magnam expedita iusto placeat eaque est deleniti, amet,
        excepturi unde accusantium dolorem similique tempora nisi aspernatur ut
        odit sint ratione. Accusamus nam fugiat cumque aperiam. Suscipit,
        provident esse laudantium debitis harum molestiae quasi in quod adipisci
        libero eius cupiditate odio assumenda sint quia facilis nisi, dicta
        nobis voluptate placeat saepe! Dignissimos perferendis, dicta
        repudiandae laborum repellendus eligendi quasi quibusdam ullam! Quo
        molestiae soluta, iste recusandae veritatis similique magni autem amet
        sit eaque. Error culpa facere, quaerat sed nihil incidunt possimus minus
        odio aspernatur provident! Delectus dolore, quis nostrum pariatur cumque
        quo optio voluptatem impedit porro sequi aliquid? Repellendus natus
        eligendi similique perspiciatis quod quos harum, vero aspernatur eos
        minima repudiandae unde doloribus amet iusto? Sint deleniti, fugiat
        voluptatem maxime ullam a nostrum? Ullam laboriosam inventore
        perferendis atque eos, quam impedit provident? Esse neque tempore,
        impedit quaerat ea reiciendis velit autem praesentium necessitatibus.
        Nihil sequi nisi natus, ducimus sapiente temporibus iusto totam iure
        impedit dicta culpa laboriosam illo facilis labore repellendus quisquam
        eaque ab omnis distinctio ullam id animi quos quaerat. Laboriosam ipsum
        nemo expedita veritatis dolorum maxime possimus tempore consequuntur.
        Impedit quod nam, rerum quaerat doloribus sapiente aliquam recusandae
        aliquid repellendus ipsum alias sint ut dolores maiores facilis adipisci
        at, ducimus porro! Suscipit ex est eaque error sapiente iusto ipsum,
        voluptas dignissimos asperiores dolorum cumque assumenda nihil facere
        quas minima sequi quis corrupti rerum quos recusandae odio ipsa
        doloremque excepturi cupiditate. Vitae tempore iste voluptatem
        dignissimos quaerat blanditiis eius, omnis delectus cupiditate eum alias
        quo molestiae ut dolore rerum libero? Officiis cum quo, in incidunt vel
        maiores alias id libero ut voluptates quaerat, corporis, ullam veniam
        totam dolorum sed! Recusandae delectus magni excepturi magnam aut dolore
        quasi repellat voluptate, nisi adipisci obcaecati sapiente, minima
        inventore deserunt itaque. Obcaecati dicta quis repudiandae cupiditate
        ab, laboriosam quas tempore laborum atque aperiam officia porro
        provident velit, pariatur vero, ipsam nam est assumenda. Optio vero
        minus, ullam quae similique, ea expedita, natus consectetur nemo est
        excepturi? Et sint sapiente architecto, ex hic distinctio neque odio
        error. Odio doloribus sunt non reiciendis perferendis deserunt quae
        rerum veritatis ipsum excepturi quod similique, sequi officia iure
        corrupti ab. Consequatur eligendi facilis ea possimus, cumque ducimus
        laudantium enim. Reprehenderit impedit magni enim vel officiis unde
        tempore mollitia!
      </div> */}
    </>
  );
}

export default SearchAndApply;
