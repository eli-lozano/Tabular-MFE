import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import BoardToolbar from '../BoardToolbar';
import userEvent from '@testing-library/user-event';

const memberNamesMock = ['Eli Lozano', 'Cristina Carillo'];
describe('BoardToolbar', () => {
    it('should render a label for team members, at least one team member icon, and a create button', () => {
        render(<BoardToolbar memberNames={memberNamesMock} />);

        expect(screen.getByText('EL')).toBeInTheDocument();
        expect(screen.getByText('CC')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument();
    });

    it('should call onCreate when create button is pressed', async () => {
        const onCreateMock = jest.fn();
        render(<BoardToolbar memberNames={memberNamesMock} onCreate={onCreateMock} />);

        await userEvent.click(screen.getByRole('button', { name: 'Create' }));

        expect(onCreateMock).toHaveBeenCalledTimes(1);
    });
});
