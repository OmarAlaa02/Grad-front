async function FetchInterviews(update, setLoading) {
  try {
    if (setLoading) setLoading(true);
    const res = await fetch("http://localhost:8080/interview", {
      credentials: "include",
    });
    if (!res.ok) {
      console.log("error occured", err);
    }
    const data = await res.json();
    update(data);
    if (setLoading) setLoading(false);
    console.log(data);
  } catch (err) {
    console.log("Error", err);
  }
}

export default FetchInterviews;
