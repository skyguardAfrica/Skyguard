import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import Logo from '/skyguard.svg'

export function NavBar () {

    return (
        <header style={styles.header}>
            <nav style={styles.nav}>
                <NavLink to={"/"} style={styles.navLink}>
                    <div style={styles.logo}>
                        <img src={Logo} width={36} height={36} style={{marginRight: 10}}/>
                        <div>
                            <p style={styles.logo_text}> Skyguard</p>
                            {/* <p> Safe drone flights</p> */}
                        </div>
                        <hr style={{color: 'white', height: '2.25rem', marginLeft: 10}}/>
                    </div>
                </NavLink>
            </nav>
        </header>
    )
}

const styles = {
    header: {
        position: 'fixed',
        width: '100%',
        height: '3.5rem',
        top: 0,
        left: 0,
        backgroundColor: '#07023b',
        zIndex: 1,
    },
    nav: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        height: '3.5rem',
        margin: '1rem',
    },
    navLink: {
        textDecoration: 'none'
    },
    logo: {
        display: 'flex',
        flexDirection: 'row',
        
    }, 
    logo_text: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        paddingBottom: '1.75rem',
        textDecoration: 'none',
    }
}