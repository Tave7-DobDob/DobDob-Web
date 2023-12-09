import RandingView from '../component/Setting/RandingView';
import SettingForm from '../component/Setting/SettingForm';
import '../styleSheets/setting.css';
const Setting = () => {
    return (<>
        <div className="Container setting">
            <header><img src="logo2.png" width="80px" /></header>
            <div className="setting-wrapper">
                <RandingView />
                <div className="centerContainer form-wrapper-wrapper">
                    <div className="centerContainer form-wrapper">
                        <SettingForm />
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Setting;