import React from "react";
import { TeamMembersState, initialTeamMembersState } from "./state";

const TeamMembersContext = React.createContext<{
    teamMembersState: TeamMembersState;
}>({
    teamMembersState: initialTeamMembersState
});

export {
    TeamMembersContext
}