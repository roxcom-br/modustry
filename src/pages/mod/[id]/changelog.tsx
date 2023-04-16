import Head from '@/components/Head'
import { getProps } from '@/lib/mod/changelog'
import { Github } from '@/lib/types'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

export const getServerSideProps: GetServerSideProps = async (context) => {
    const props = getProps(context)
    return { props }
}

export default function Changelog({ gjson, data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <>
            <Head />
            <main className='modsmain bg-dark text-white'>
                <div className="container">
                    <header className="d-flex justify-content-center py-3 newcolor">
                        <ul className="nav nav-pills">
                            <li className="nav-item"><a href="/mods" className="nav-link">Mods</a></li>
                            <li className="nav-item"><a href="/modpacks" className="nav-link">Modpacks</a></li>
                            <li className="nav-item"><a href="/textures" className="nav-link">Texture Packs</a></li>
                        </ul>
                    </header>
                    <section>
                        <h2>{data.name}</h2>
                        <div className='text-muted pb-4  border-bottom border-white'>
                            <span>Repo: <a className='text-muted text-decoration-none' href={'https://github.com/' + data.repo}>{data.repo}</a></span><br/>
                            <span>Author: <a className='text-muted text-decoration-none' href={'https://github.com/' + data.author}>{data.author}</a></span><br/>
                            <span>Stars: {data.stars}</span><br/>
                            <span>Game Version: <a className='text-muted text-decoration-none' href={'https://github.com/Anuken/Mindustry/releases/tag/v' + data.minGameVersion}>{data.minGameVersion}</a></span><br/>
                        </div>
                        <br/>
                        <div className='d-flex justify-content-center'>
                            <ul className="nav nav-pills">
                                <li className="nav-item"><a href={"/mod/" + data.name} className="nav-link">Description</a></li>
                                <li className="nav-item"><a href={"/mod/" + data.name + "/changelog"} className="nav-link active">Changelog</a></li>
                                <li className="nav-item"><a href={"/mod/" + data.name + "/versions"} className="nav-link">Versions</a></li>
                            </ul>
                        </div>
                        <div className="list-group list-group-flush border-bottom scrollarea">
                                {gjson.map((value: Github, _index: number, _array: Github[]) => (
                                    <>
                                        <a className="list-group-item list-group-item-action py-3 lh-sm bg-dark text-white border-white" aria-current="true">
                                            <div className="d-flex w-100 align-items-center justify-content-between">
                                                <h2 className="mb-1 font-weight-bold">{value.name} | {value.tag_name}</h2>
                                            </div>
                                            <br />
                                            <div className="col-10 mb-1 small" dangerouslySetInnerHTML={{ __html: value.body }} />
                                        </a>
                                    </>
                                ))}
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}
