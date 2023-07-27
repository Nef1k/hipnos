import s from "./SandboxPage.module.css";
import HFrame from "../../components/HipnosComponents/HFrame/HFrame";
import HPanel from "../../components/HipnosComponents/HPanel/HPanel";
import HPanelHeader from "../../components/HipnosComponents/HPanel/HPanelHeader";
import HPanelContent from "../../components/HipnosComponents/HPanel/HPanelContent";
import HPanelFooter from "../../components/HipnosComponents/HPanel/HPanelFooter";
import Clock from "../../components/Clock/Clock";

const SandboxPage = () => {
  return (
    <div className={s.pageWrapper} style={{display: "flex", flexDirection: "column"}}>
      <HPanel style={{width: "800px"}} className={s.anim}>
        <HPanelHeader>
          <div style={{display: "flex", height: "100%", width: "100%", alignItems: "end"}}>
            <h2 style={{display: "block", flex: 1, margin: 0}}>HIPNOS</h2>
            <div style={{width: "200px", textAlign: "right"}}>
              <Clock/>
            </div>
          </div>
        </HPanelHeader>
        <HPanelContent>
          <div style={{padding: "0 10px 0 10px"}}>
            <p style={{textAlign: "justify"}}>
              But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I
              will give you a complete account of the system, and expound the actual teachings of the great explorer of
              the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself,
              because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter
              consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain
              pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can
              procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical
              exercise, except to obtain some advantage from it? But who has any right to find fault with a man who
              chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no
              resultant pleasure?
            </p>
            <p style={{textAlign: "justify"}}>
              But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I
              will give you a complete account of the system, and expound the actual teachings of the great explorer of
              the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself,
              because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter
              consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain
              pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can
              procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical
              exercise, except to obtain some advantage from it? But who has any right to find fault with a man who
              chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no
              resultant pleasure?
            </p>
          </div>
        </HPanelContent>
        <HPanelFooter>
          <div style={{display: "flex", alignItems: "center", height: "100%", padding: "10px"}}>
            Статус: <span style={{color: "#2AB840", marginLeft: "5px"}}>ОК</span>
          </div>
        </HPanelFooter>
      </HPanel>
    </div>
  );
}

export default SandboxPage;
