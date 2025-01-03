import React from 'react';

import IconBxMessageSquareEdit from '../icons/IconBxMessageSquareEdit';
import IconMoonStarsFill from '../icons/IconMoonStarsFill';
import IconSunFill from '../icons/IconSunFill';

const iconSize = "20";

function Header({page, post:{uid}, updateAppSettings, appSettings:{darkMode}}) {
    return (
        <div className={`container-fluid font-domine ${darkMode?"bg-dark text-light":"bg-light text-dark"}`}>
            <header className="d-flex flex-wrap justify-content-center pt-3 pb-2 mb-2 border-bottom">
                <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                    <IconBxMessageSquareEdit width={iconSize*2} height={iconSize*2} />
                    <div className="fs-1 fw-bold">Ratingly</div>
                </a>

                <ul className="nav nav-pills mt-3">
                    <li className="nav-item"><a href="/" className={`nav-link fw-bold ${page=="Home"&&"active"}`}>Home</a></li>
                    <li className="nav-item"><a href="/login" className={`nav-link fw-bold ${page=="Login"&&"active"}${page=="Register"&&"active"}`}>Login / Register</a></li>
                    <li className="nav-item pr-1"><a href="/create" className={`nav-link fw-bold ${page=="Create"&&"active"}`}>Create A Post</a></li>
                    <li className="nav-item px-1">
                        <button className={`btn ${darkMode?"btn-light":"btn-dark"} rounded-circle ratio-1x1 h-100`} onClick={ () => {updateAppSettings({"darkMode": !darkMode})} }type="submit">
                            {darkMode?(
                                <IconSunFill width={iconSize} height={iconSize} className="d-flex"/>
                            ):(
                                <IconMoonStarsFill width={iconSize} height={iconSize} className="d-flex"/>
                            )}
                        </button>
                    </li>
                </ul>
            </header>
        </div>

        
    )
}


export default Header;

