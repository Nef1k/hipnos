import s from "./SandboxPage.module.css";
import HFrame from "../../components/HipnosComponents/HFrame/HFrame";
import HPanel from "../../components/HipnosComponents/HPanel/HPanel";
import HPanelHeader from "../../components/HipnosComponents/HPanel/HPanelHeader";
import HPanelContent from "../../components/HipnosComponents/HPanel/HPanelContent";
import HPanelFooter from "../../components/HipnosComponents/HPanel/HPanelFooter";
import Clock from "../../components/Clock/Clock";
import HFramedButton from "../../components/HipnosComponents/HFramedButton/HFramedButton";
import {HIconEyeClosed, HIconEyeOpen, HIconLockClosed} from "../../components/HipnosComponents/HIcons/HIcons";


const btnWidth = 90;

const buttons = [
  {caption: "Морфей", content: <HIconEyeOpen width={btnWidth} />},
  {caption: "Фантас", content: <HIconEyeClosed width={btnWidth} />, selected: true},
  {caption: "Фобетор", content: <HIconLockClosed width={btnWidth} />, disabled: true},
];

const SandboxPage = () => {
  return (
    <div className={s.pageWrapper} style={{display: "flex", flexDirection: "column"}}>
      <HPanel style={{}}>
        <HPanelHeader>
          <div style={{display: "flex", height: "100%", width: "100%", alignItems: "end"}}>
            <h2 style={{display: "block", flex: 1, margin: 0}}>HIPNOS</h2>
            <div style={{width: "200px", textAlign: "right"}}>
              <Clock/>
            </div>
          </div>
        </HPanelHeader>
        <HPanelContent style={{height: "100%", display: "grid", gridTemplateColumns: "1fr", gridGap: "20px"}}>
          {/*<HFramedButton caption="Фантас"><HIconLockClosed /></HFramedButton>*/}
          {/*<HFramedButton caption="Фобетор"><HIconLockClosed /></HFramedButton>*/}
          {/*<HFramedButton caption="Хуй моржовый"><HIconLockClosed /></HFramedButton>*/}
          {buttons.map(({caption, content, disabled, selected}) => (
            <HFramedButton disabled={disabled} selected={selected} caption={caption}>{content}</HFramedButton>
          ))}
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
