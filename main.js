const { createRoot } = ReactDOM;

const projects = [
    {
        id:"elements-connections-d3",
        title: "Elements Connectios D3",
        link: "./elements-connections-d3/index-elements.html"
    },
    {
        id:"elements-connections-react",
        title: "Elements Connectios React",
        link: "./elements-connections-react/index.html"
    },
    {
        id:"jucara-calculator",
        title: "Jucara Calculator",
        link: "./jucara-calculator/index.html"
    },
]

const App = () => {

    const projectsMap = projects.map(p => {
        return (
            <li className="project" key={p.id}>
                <a 
                    className="project-link"
                    href={p.link}
                >
                    <h3>{p.title}</h3>
                </a>
            </li>
        )
    })

    return (
        <React.Fragment>
            <h1 id="title">Permaculture Projects</h1>
            <ul id="projects">
                {projectsMap}
            </ul>
        </React.Fragment>
    )
};

//Render
const app = document.getElementById('root');
const root = createRoot(app);
root.render(<App/>)