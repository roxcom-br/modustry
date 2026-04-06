import CustomHead from "@/components/Head"
import DefaultPage from "@/lib/default"
import { ServerType } from "@/lib/types"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { useEffect } from "react"
import Navbar from "@/components/Navbar"
import ServerListElement from "@/components/lists/ServerListElement"
import Pagination from "@/components/search/Pagination"
import { ServerSearchBar } from "@/components/search/SearchBar"
import { getProps } from "@/lib/server"

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const props = await getProps(ctx)
    return { props }
}

export default function Servers({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const manager = new DefaultPage<ServerType>(data)

    useEffect(() => {
        manager.update()
    }, [manager.index]);

    return (
        <>
            <CustomHead title='Search Servers - Modustry' description='' />
            <main className="shadow">
                <Navbar />
                <section className="container p-0">
                    <div className="mods-list list-group list-group-flush scrollarea">
                        <ServerSearchBar data={data} manager={manager} />
                        {manager.results && manager.results.map((value: ServerType, index: number, _array: ServerType[]) => (
                            <>
                                {!manager.query && index < manager.perPage && <ServerListElement value={value} key={""} />}
                                {manager.query && <ServerListElement value={value} key={""} />}
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
