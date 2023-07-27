import s from "./SandboxPage.module.css";
import HFrame from "../../components/HipnosComponents/HFrame/HFrame";

const SandboxPage = () => {
  return (
    <div className={s.pageWrapper} style={{display: "flex", flexDirection: "column"}}>
      {/*<div style={{display: "flex"}}>*/}
      {/*  <HFrame style={{width: "800px", height: "600px"}}>Frame 1</HFrame>*/}
      {/*  <HFrame style={{width: "480px", height: "320px", marginLeft: "230px"}}>Frame 2</HFrame>*/}
      {/*</div>*/}
      <div style={{display: "flex"}}>
        <HFrame style={{width: "300px", height: "300px"}} />
        <HFrame style={{width: "800px", height: "300px"}} />
      </div>
      <HFrame style={{width: "1100px", height: "600px"}} />
    </div>
  );
}

export default SandboxPage;
