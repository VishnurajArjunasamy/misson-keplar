import { FC, memo, useEffect } from "react";
import classes from "./members-section.module.scss";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { fetchMembers } from "../../store/side-bar-slice";
import MemberCard from "../../components/member-card/member-card";

interface MemebersSectionProps {}

const MembersSection: FC<MemebersSectionProps> = ({}) => {
  const members = useSelector((state: RootState) => state.sideBar.members);
  const loading = useSelector((state: RootState) => state.sideBar.loading);
  const error = useSelector((state: RootState) => state.sideBar.error);
  const isDarkMode = useSelector(
    (state: RootState) => state.sideBar.isDarkMode
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchMembers());
  }, []);

  if (loading) {
    return "Loading..";
  }

  if (error) {
    return error;
  }

  return (
    <div className={`${classes.members} ${isDarkMode ? classes.dark : ""}`}>
      <h1 className={classes.title}>{"Members"}</h1>
      <div className={classes.membersContainer}>
        {members?.map((member) => (
          <MemberCard
            key={member.id}
            image={member.photo}
            name={member.name}
            city={member.company.location}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(MembersSection);
