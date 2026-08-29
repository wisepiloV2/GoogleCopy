import GoogleLogo from '@/components/GoogleLogo/GoogleLogo';
import LinkBar from '@/components/Layout/TopBar/LinkBar';
import { TopBar } from '@/components/Layout/TopBar/TopBar';

function HomePage(){
    return (
        <>
        <header>
            <TopBar>
                <LinkBar />
            </TopBar> 
        </header>
        <main style={{display: 'flex', flexDirection:'column', justifyContent: 'center', gap: '30px', alignItems: 'center', marginTop: '30px'}}>
            <GoogleLogo size="10em" />
        </main>
        </>  
    );
}

export { HomePage }