import { TopBar, LinkBar } from '../features/topNavigation';

function HomePage(){
    return (
        <header>
            <TopBar>
                <LinkBar />
            </TopBar> 
        </header>
    );
}

export { HomePage }