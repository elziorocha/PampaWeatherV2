"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import React from "react"
import { github } from "../utils/Icons";
import { ThemeDropdown } from "./ThemeDropdown/ThemeDropdown";
import SearchDialog from "./SearchDialog/SearchDialog";
import { useGlobalContext } from "../contexts/GlobalContext";

function Navbar() {

    const router = useRouter();
    const { state } = useGlobalContext();

    return (
        <div className="flex w-full items-center justify-end py-4">
            <div className="search-container flex w-full shrink-0 gap-2 sm:w-fit">
                <SearchDialog />

                <div className="btn-group flex items-center gap-2">
                    <ThemeDropdown />

                    <Button onClick={() => { router.push("https://github.com/elziorocha") }}
                        className="github-btn flex items-center gap-2 font-semibold">
                        {github} GitHub
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Navbar