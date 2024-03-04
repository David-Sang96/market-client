import { Outlet, useLocation } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import Nav from "../components/Nav";

const Main = () => {
  const location = useLocation();
  return (
    <section className="max-w-[90%] mx-auto">
      <Nav />
      <SwitchTransition>
        <CSSTransition
          timeout={200}
          classNames={"fade"}
          key={location.pathname}
        >
          <Outlet />
        </CSSTransition>
      </SwitchTransition>
    </section>
  );
};

export default Main;
