import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom'
import { OpenStreetMapProvider } from "leaflet-geosearch";

import { Home } from './home'
import ErrorPage from './error'
import SearchLogo from '/search.svg'
import { NavBar } from './navigation/nav';

function LocationButton ({element}) {

    const navigate = useNavigate()

    function resultsButtonPressed (event) {
        navigate('/search', {state: element})
    }

    return (
        <button 
            id='results-button' 
            style={styles.resultsButton} 
            onClick={resultsButtonPressed}> 
                {element.label} 
        </button> 
    )
}

function App() {
    const [searchInput, setSearchInput] = useState('')
    const [searchResults, setSearchResults] = useState('')
    const [element, setElement] = useState(null)

    const provider =new OpenStreetMapProvider()
    const navigate = useNavigate()

    function searchButtonPressed (e) {
        e.preventDefault()
        if (element != null) {
            console.log(element)
            navigate('/search', {state: element})
        }
    }

    function handleChange(change) {
        change.preventDefault()

        setSearchInput(change.target.value)
        if (searchInput !== '') {
            provider.search({query: searchInput}).then(results => {
                if (results.length > 5) 
                    results = results.slice(0, 4)
                setElement(results[0])
                const output = 
                    <ul style={{listStyle: 'none'}}> {
                        results.map(element => <li key={element.x}> <LocationButton element={element}/> </li>)
                        } 
                    </ul>
                setSearchResults(output)
            }).catch(error => {
                setSearchResults("No locations found")
            }) 
        }
    }

    return (
        <div style={styles.root}>
            <NavBar />
            <div id='text-container'>
                <p style={styles.text}> Skyguard.africa</p>
            </div>
            <div id='form-container'>
                <form style={styles.form} id='form'>
                    <input 
                        name="query" 
                        placeholder='Where do you want to fly'
                        onChange={handleChange}
                        value={searchInput}
                        size={'100vh'}
                        autoFocus={true}
                        style={styles.input}
                    />
                    {/* <button type="submit" onClick={ searchButtonPressed } style={styles.button}> 
                        <img src={SearchLogo} width={25} height={25} />
                    </button> */}
                </form>
            </div>
            <div id='results-container'>
                {searchResults}
            </div>
        </div>
    )
}

const styles = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        margin: 20,
        padding: 20,
    },
    text: {
        fontSize: '3em', 
        fontWeight: 'bold', 
        color: '#07023b', 
        margin: 0, 
        alignContent: 'center'
    },
    form: {
        padding: 10,
        margin: 20,
        width: '90%',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        position: 'relative',
        marginRight: 10,
        padding: 3,
        paddingLeft: 10,
        width: '100%',
        fontSize: 18,
        borderStyle: 'solid',
        borderRadius: 20

    },
    button: {
        position: 'absolute',
        borderStyle: 'none',
        backgroundColor: 'white',
        marginRight: 10,
        marginTop: 3
    },
    resultsButton: {
        borderStyle: 'none',
        backgroundColor: 'white',
        margin: 5,
        borderRadius: 5
    }
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />
    },
    {
        path: '/search',
        element: <Home />
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)


