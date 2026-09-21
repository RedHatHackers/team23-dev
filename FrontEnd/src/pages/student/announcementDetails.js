import { getAnnouncement } from "../../localstorage/announcement";

export default function AnnouncementDetails() {
  const Announcement = getAnnouncement();
  return (
    <>
      <div className="main  p-5 text-center">
        <div className="cardHeader">
          <br />
          <br />
          <br />
          <br />
          <h2>{Announcement.announceHeading}</h2>
          <br />
          <br />
          <br />
          <br />
          <h4>{Announcement.announce}</h4>
        </div>
      </div>
    </>
  );
}
