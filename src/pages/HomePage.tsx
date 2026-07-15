import SearchBar from '../components/SearchBar/SearchBar';
import Logo from '../components/Logo/Logo'
import { TopBar, LinkBar } from '../features/topNavigation';

function HomePage(){
    return (
        <>
        <header>
            <TopBar>
                <LinkBar />
            </TopBar> 
        </header>
        <main style={{display: 'flex', flexDirection:'column', justifyContent: 'center', gap: '10px'}}>
            <Logo size="10em" />
            <SearchBar />
        </main>
        </>  
    );
}

export { HomePage }