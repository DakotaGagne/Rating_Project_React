import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import IconProfile from '../icons/IconProfile';
import IconGithub from '../icons/IconGithub';
import IconLinkedIn from '../icons/IconLinkedIn';


export default function PersonalLinks() {
    return (
        <DropdownButton title="Personal Links" className="fs-3 bg-body-tertiary hovering-no-scale" variant="tertiary" drop="up-centered">
            <Dropdown.Item href="https://www.dakotagagne.ca" className="text-body-secondary hovering py-2 fs-4"><IconProfile className="me-2 mb-1" />Portfolio</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="https://www.github.com/DakotaGagne" className="text-body-secondary hovering py-2 fs-4"><IconGithub className="me-2 mb-1" />Github</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="https://www.linkedin.com/in/dakota-gagne/" className="text-body-secondary hovering py-2 fs-4"><IconLinkedIn className="me-2 mb-1" />LinkedIn</Dropdown.Item>
        </DropdownButton>
    )
}