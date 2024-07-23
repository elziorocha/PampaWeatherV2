"use client"
import { useGlobalContext, useGlobalContextUpdate } from '@/app/contexts/GlobalContext'
import { commandIcon } from '@/app/utils/Icons'
import { Button } from '@/components/ui/button'
import { Command, CommandInput, CommandList, CommandItem } from '@/components/ui/command'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import React from 'react'

const SearchDialog = () => {

    const { geoCodedList, inputValue, handleInput } = useGlobalContext()
    const { setActiveCityCoords } = useGlobalContextUpdate()
    const [hoveredIndex, setHoveredIndex] = React.useState<number>(0)

    const getClickedCoords = (lat: number, lon: number) => {
        setActiveCityCoords([lat, lon])
    }

    return (
        <div className='search-btn'>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className="inline-flex items-center justify-center border text-sm
                    font-medium duration-200 ease-in-out hover:bg-slate-100 hover:dark:bg-[#131313]">
                        <p className="text-sm text-muted-foreground">Search Here...</p>
                        <div className="ml-40 flex items-center gap-1.5 rounded-sm bg-slate-200 py-[4px] pl-[5px]
                        pr-[7px] dark:bg-[#262626]">
                            {commandIcon}
                            <span className="text-xs">F</span>
                        </div>
                    </Button>
                </DialogTrigger>

                <DialogContent className="p-0">
                    <Command className="rounded-lg border shadow-md">
                        <CommandInput value={inputValue} onChangeCapture={handleInput}
                            placeholder='Search...' />
                        <CommandList>
                            {geoCodedList?.length === 0 || (!geoCodedList && <p>No Results</p>)}

                            {geoCodedList && geoCodedList.map((
                                item: {
                                    name: string;
                                    country: string;
                                    state: string;
                                    lat: number;
                                    lon: number;
                                },
                                index: number) => {
                                const { country, state, name } = item;
                                return (
                                    <>
                                        <ul className='p-2 pb-1'>
                                            <li key={index} onMouseEnter={() => setHoveredIndex(index)}
                                                className={`cursor-default rounded-lg px-2 py-3 text-sm font-medium
                                                ${hoveredIndex === index ? "bg-accent" : ""}`}
                                                onClick={() => {
                                                    getClickedCoords(item.lat, item.lon)
                                                }}>

                                                <p>{name}, {state && state + ','} {country}</p>
                                            </li>
                                        </ul>
                                    </>
                                );
                            }
                            )}
                        </CommandList>
                    </Command>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default SearchDialog
