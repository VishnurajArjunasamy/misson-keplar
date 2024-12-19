import { FC, useEffect } from "react";
import classes from "./members-section.module.scss";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { fetchMembers } from "../../store/side-bar-slice";
import MemberCard from "../../components/member-card/member-card";

interface MemebersSectionProps {}

const MemebersSection: FC<MemebersSectionProps> = ({}) => {
  const members = useSelector((state: RootState) => state.sideBar.members);
  const loading = useSelector((state: RootState) => state.sideBar.loading);
  const error = useSelector((state: RootState) => state.sideBar.error);
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

  console.log(members);

  return (
    <div className={classes.members}>
      {members?.map((member) => (
        <MemberCard
          key={member.id}
          image={member.photo}
          name={member.name}
          city={member.company.location}
        />
      ))}
    </div>
  );
};

export default MemebersSection;
