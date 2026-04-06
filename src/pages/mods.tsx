import CustomHead from "@/components/Head"
import DefaultPage, { getProps } from "@/lib/default"
import { Data } from "@/lib/types"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { useEffect } from "react"
import Navbar from "@/components/Navbar"
import ListElement from "@/components/lists/ModListElement"
import Pagination from "@/components/search/Pagination"
import SidebarFilters from "@/components/search/SidebarFilters"
import SearchBar from "@/components/search/SearchBar"
import { modsFilter } from "@/lib/filter"

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const props = await getProps(ctx)
    return { props }
}

export default function Mods({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const mods = modsFilter(data)
    const manager = new DefaultPage(mods)

    useEffect(() => {
        manager.update()
    }, [manager.index]);

    return (
        <>
            <CustomHead title='Search Mods - Modustry' description='' />
            <main className="shadow">
                <Navbar />
                <section className="container p-0">
                    <SidebarFilters data={mods} manager={manager} />
                    <div className="mods-list list-group list-group-flush scrollarea">
                        <SearchBar data={mods} manager={manager} />
                        {manager.results && manager.results.map((value: Data, index: number, _array: Data[]) => (
                            <>
                                {!manager.query && index < manager.perPage && <ListElement value={value} key={value.repo} />}
                                {manager.query && <ListElement value={value} key={value.repo} />}
                            </>
                        ))}
                        {!manager.results && <>
                            <div className="d-flex justify-content-center my-5">
                                <h2>No Results Found</h2>
                            </div>
                        </>}
                        {!manager.query && <Pagination manager={manager} />}
                    </div>
                </section>
            </main>
        </>
    )
}
