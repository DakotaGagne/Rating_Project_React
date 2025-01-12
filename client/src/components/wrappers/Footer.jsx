/*

Component that displays the footer of the website. 
It contains links to the technologies used in the project, the credits page, and links to the developer's GitHub and personal website.

Props:
    - mobile: boolean - whether mobile mode should be used
*/


import React from 'react';
import { useNavigate } from 'react-router-dom';
import IconReact from '../icons/IconReact';
import IconNodejs from '../icons/IconNodejs';
import IconBootstrap from '../icons/IconBootstrap';
import IconGithub from '../icons/IconGithub';
import IconProfile from '../icons/IconProfile';
import IconArrowRightShort from '../icons/IconArrowRightShort';


const iconSize = "30";

export default function Footer( { mobile, windowWidth } ) {
    const navigate = useNavigate();
    return (
        <footer className="d-flex justify-content-between align-items-center py-2 border-top font-domine bg-body-tertiary" style={{bottom:"0px"}}>
            <div className="col d-flex align-items-center ms-5">
                <ul className="nav justify-content-start list-unstyled d-flex">
                    <li className="ms-3 pl-1 ">
                        <a href="https://react.dev/" className="text-body-secondary">
                            <IconReact width={iconSize} height={iconSize} />
                        </a>
                    </li>
                    <li className="ms-3">
                        <a href="https://nodejs.org/en" className="text-body-secondary">
                            <IconNodejs width={iconSize} height={iconSize} />
                        </a>
                    </li>
                    <li className="ms-3 pr-1">
                        <a href="https://getbootstrap.com/" className="text-body-secondary">
                            <IconBootstrap width={iconSize} height={iconSize} />
                        </a>
                    </li>
                    <li className="ms-3 p-1"><span className="mb-3 mb-md-0 text-body-secondary"> © {new Date().getFullYear()} Ratingly </span></li>
                    <li className="ms-3 p-1"><a onClick={()=>navigate("/credits")}> Credits </a></li>
                </ul>

            </div>
            <ul className="nav col justify-content-end list-unstyled d-flex me-5">
                <li className="ms-3">
                    <span className="text-body-primary">
                            Dakota Gagne Links
                        <IconArrowRightShort width={iconSize} height={iconSize} />
                    </span>
                </li>
                <li className="ms-3"><a className="text-body-secondary" href="https://github.com/DakotaGagne/Rating_Project_React">
                    <IconGithub width={iconSize} height={iconSize} />
                </a></li>
                <li className="ms-3"><a className="text-body-secondary" href="https://www.dakotagagne.ca/">
                    <IconProfile width={iconSize} height={iconSize} />
                </a></li>
            </ul>
        </footer>
    )
}