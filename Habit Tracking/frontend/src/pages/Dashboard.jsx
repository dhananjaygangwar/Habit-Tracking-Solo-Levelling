import { React, useState } from "react"

import { Checkbox } from '../components/Checkbox'
import { Heading } from '../components/Heading'
import { Card } from '../components/Card'
import SubmitButton from '../components/SubmitButton'
import { XPBar } from '../components/XPBar'
import { StatusBadge } from '../components/StatusBadge'

export default function Dashboard() {
    const [checkboxState, setCheckboxState] = useState(false);
    
    return (
        <div className="min-h-screen bg-black px-4 py-6 space-y-6">

            {/* PLAYER STATUS */}
            <Card>
                <Heading
                    title="HUNTER STATUS"
                    subtitle="The system is evaluating you"
                />
                <XPBar current={60} max={100} />
            </Card>

            {/* TODAY'S HABITS */}
            <Card>
                <Heading
                    title="TODAY'S QUESTS"
                    subtitle="Failure will not be tolerated"
                />

                <div className="mt-4 space-y-4">

                    {/* Single Habit */}
                    <div className="border border-indigo-500/20 rounded-lg p-3 bg-[#05070d]">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm text-indigo-200 font-semibold">
                                    10,000 Steps
                                </p>
                                <p className="text-xs text-indigo-400/60 mt-1">
                                    Walk at least 10k steps today
                                </p>
                            </div>
                            <StatusBadge status="PENDING" />
                        </div>

                        <div className="mt-3">
                            <Checkbox
                                label="Mark as completed"
                                checked={checkboxState}
                                onChange={() => setCheckboxState(!checkboxState)}
                            />
                        </div>
                    </div>

                    {/* Another Habit */}
                    <div className="border border-red-500/30 rounded-lg p-3 bg-[#0b0507]">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm text-red-300 font-semibold">
                                    Meditation
                                </p>
                                <p className="text-xs text-red-400/60 mt-1">
                                    5–10 mins mindfulness
                                </p>
                            </div>
                            <StatusBadge status="FAILED" />
                        </div>

                        <p className="mt-3 text-xs text-red-300">
                            ❌ Punishment: Cold shower for 2 mins
                        </p>
                    </div>

                </div>
            </Card>

            {/* PUNISHMENT SUMMARY */}
            <Card>
                <Heading
                    title="ACTIVE PENALTIES"
                    subtitle="Clear these to regain honor"
                />

                <div className="mt-3 text-sm text-red-300">
                    • Cold shower for 2 mins
                </div>

                <div className="mt-4">
                    <SubmitButton>ACCEPT PUNISHMENT</SubmitButton>
                </div>
            </Card>

        </div>
    );
}
