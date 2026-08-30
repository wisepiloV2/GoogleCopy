import { AccountSettings } from "@/features/account";
import LinkBar from "@/components/Layout/TopBar/LinkBar";
import { TopBar } from "@/components/Layout/TopBar/TopBar";
import { MainLayout } from "@/components/Layout/MainLayout";
import GoogleLogo from "@/components/GoogleLogo/GoogleLogo";

function SettingsPage(){
    return(
      <>
        <header>
          <TopBar>
            <div style={{display: 'flex', width: '100%', justifyContent: 'space-between', gap: '2px', lineHeight: '1.5'}}>
              <GoogleLogo size="1.5em" />
              <LinkBar />
            </div>
          </TopBar> 
        </header>
        <MainLayout>
          <AccountSettings />
        </MainLayout>
      </>
    );
}

export {SettingsPage};