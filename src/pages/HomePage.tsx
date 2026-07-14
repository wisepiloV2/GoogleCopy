import SearchBar from '../components/SearchBar/SearchBar';
import { Logo } from '../components/Logo/Logo'
import { TopBar, LinkBar } from '../features/topNavigation';

function HomePage(){
    return (
        <>
        <header>
            <TopBar>
                <LinkBar />
            </TopBar> 
        </header>
        <main>
            {Logo}
            <SearchBar />
        </main>
        </>  
    );
}

export { HomePage }