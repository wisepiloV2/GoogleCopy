import { AccountSettings } from "@/features/account";
import { TopBar } from "@/components/Layout/TopBar/TopBar";
import { MainLayout } from "@/components/Layout/MainLayout";

function SettingsPage(){
    return(
      <>
        <header>
          <TopBar logoView={true}>
          </TopBar> 
        </header>
        <MainLayout>
          <AccountSettings />
        </MainLayout>
      </>
    );
}

export {SettingsPage};