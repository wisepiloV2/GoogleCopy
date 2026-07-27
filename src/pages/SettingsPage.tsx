import { AccountSettings } from "../features/account";
import { LinkBar, TopBar } from "../features/topNavigation";

function SettingsPage(){
    return(
        <>
        <header>
            <TopBar>
                <LinkBar />
            </TopBar> 
        </header>
        <AccountSettings />
        </>
    );
}

export {SettingsPage};