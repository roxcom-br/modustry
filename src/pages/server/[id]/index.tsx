import Head from '@/components/Head'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { getProps } from '@/lib/server/server'
import Navbar from '@/components/Navbar'
import ServerInfo from '@/components/server/ServerInfo'

export const getServerSideProps: GetServerSideProps = async (context) => {
    const props = getProps(context)
    return { props }
}

export default function Mod({ data, readme, allDownloadsCount, updatedDate, publishedDate }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <>
            <Head title={data.name + ' - Modustry'} description={''} />
            <main className='container modpage'>
                <Navbar />
                <section>
                    <ServerInfo value={data}  />
                    <div className='d-flex markdown'>
                        <small> * Coming Soon Feature * </small>
                    </div>
                </section>
            </main>
        </>
    )
}
