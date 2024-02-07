import { teamMemberMock, teamMemberMock2, teamMemberMock3, teamMemberMock4, teamMemberMock5 } from "@/test/mocks/team-member-mocks";
import { TeamMember, TeamMemberId, TeamMembersMap } from "@/types";

interface TeamMembersState {
    teamMembers: TeamMembersMap;
}

const initialTeamMembersState: TeamMembersState = {
    teamMembers: new Map([[teamMemberMock.id, teamMemberMock],
    [teamMemberMock2.id, teamMemberMock2], [teamMemberMock3.id, teamMemberMock3],
    [teamMemberMock4.id, teamMemberMock4], [teamMemberMock5.id, teamMemberMock5]]),
};

export type { TeamMembersState };
export {
    initialTeamMembersState
};
