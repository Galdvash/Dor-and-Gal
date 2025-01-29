export default async function page({ params }) {
    const { slug } = await params;

    console.log("slug: ", slug);
    return (
        <>
            {/* <ClientComponent > */}
        </>
    );
};
