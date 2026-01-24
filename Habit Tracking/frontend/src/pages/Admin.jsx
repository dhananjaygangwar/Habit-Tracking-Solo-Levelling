import { useState } from "react";
import { Button } from '../components/Button'
import { Checkbox } from '../components/Checkbox'
import { Heading } from '../components/Heading'
import { Card } from '../components/Card'
import SubmitButton from '../components/SubmitButton'
import Dashboard from '../pages/Dashboard'
import { Table } from '../components/Table'
import { Popup } from '../components/Popup'
import { TextField } from '../components/TextField'
import { TextArea } from '../components/TextArea'
import { SectionHeader } from '../components/SectionHeader'

export default function Admin() {
    const [activePopup, setActivePopup] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);

    const openPopup = (type, item = null) => {
        setSelectedItem(item);
        setActivePopup(type);
    };

    const closePopup = () => {
        setSelectedItem(null);
        setActivePopup(null);
    };

    const columns = [
        { key: "email", label: "EMAIL" },
        { key: "level", label: "LEVEL" },
        { key: "level123", label: "LEVEL123" }
    ]

    const users = [
        { email: "10K Steps", level: "Walk daily", level123: "asdfasdf " },
        { email: "Meditation", level: "5-10 mins", level123: "5-10 mins" },
        { email: "Meditation", level: "5-10 mins", level123: "5-10 mins" },
        { email: "Meditation", level: "5-10 mins", level123: "5-10 mins" }
    ]
    const habits = [
        {
            id: 1,
            title: "10,000 Steps",
            description: "Walk at least 10k steps today",
            status: "PENDING", // DONE | FAILED
            punishment: "50 pushups before sleep"
        },
        {
            id: 2,
            title: "Meditation",
            description: "5-10 mins mindfulness",
            status: "FAILED",
            punishment: "Cold shower for 2 mins"
        }
    ];


    const punishments = [
        {
            id: 1,
            title: "10,000 Steps",
            description: "Walk at least 10k steps today",
            status: "PENDING", // DONE | FAILED
            punishment: "50 pushups before sleep"
        },
        {
            id: 2,
            title: "Meditation",
            description: "5-10 mins mindfulness",
            status: "FAILED",
            punishment: "Cold shower for 2 mins"
        }
    ];
    return (
        <div className="min-h-screen bg-black px-4 py-6 space-y-6">

            {/* HEADER */}
            <Card>
                <Heading
                    title="ADMIN CONTROL PANEL"
                    subtitle="Absolute authority granted"
                />
            </Card>

            {/* HABITS */}
            <Card>
                <SectionHeader
                    title="HABITS"
                    label="ADD HABIT"
                    onClick={() => openPopup("ADD_HABIT")}
                />

                <Table
                    columns={[
                        { key: "title", label: "TITLE" },
                        { key: "description", label: "DESCRIPTION" },
                    ]}
                    data={habits}
                    actions={[
                        { label: "EDIT", onClick: row => openPopup("EDIT_HABIT", row) },
                        { label: "DELETE", variant: "danger", onClick: row => openPopup("DELETE_HABIT", row) },
                    ]}
                />
            </Card>

            {/* PUNISHMENTS */}
            <Card>
                <SectionHeader
                    title="Punishments"
                    label="ADD PUNISHMENT"
                    onClick={() => openPopup("ADD_PUNISHMENT")}
                />

                <Table
                    columns={[
                        { key: "title", label: "TITLE" },
                        { key: "description", label: "DESCRIPTION" },
                    ]}
                    data={punishments}
                    actions={[
                        { label: "EDIT", onClick: row => openPopup("EDIT_PUNISHMENT", row) },
                        { label: "DELETE", variant: "danger", onClick: row => openPopup("DELETE_PUNISHMENT", row) },
                    ]}
                />
            </Card>

            {/* USERS */}
            <Card>
                <SectionHeader
                    title="Users"
                    label="Add User"
                    onClick={() => openPopup("ADD_USER")}
                />

                <Table
                    columns={columns}
                    data={users}
                    actions={[
                        { label: "CHANGE LEVEL", onClick: row => openPopup("CHANGE_LEVEL", row) },
                    ]}
                />
            </Card>

            {/* POPUPS */}
            {/* <AdminPopups
                type={activePopup}
                item={selectedItem}
                onClose={closePopup}
            /> */}
        </div>
    );
}
