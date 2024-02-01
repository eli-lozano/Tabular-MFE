import { Box } from "@mui/system";

const BoardContent: React.FC = () => {
    return (
        <Box>
            <Box>To do</Box>
            <Box>In Progress</Box>
            <Box>Ready for QA</Box>
            <Box>Ready to Deploy</Box>
            <Box>Done</Box>
        </Box>);
};

export default BoardContent;