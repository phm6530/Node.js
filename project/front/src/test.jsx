



export default function InfiniteScrollTest() {
  const obj = {
    company : "4125125",
    description: "124214\n12412\n125\n125\n125\n"
  }

  const dataRepalce = {...obj , description : obj.description.replaceAll('\n','<br>')};
  console.log(dataRepalce);
  return (
    <>

      
    </>
  );
}