import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import BoardToolbar from '../BoardToolbar';

const memberNamesMock = ['Eli Lozano', 'Cristina Carillo'];
describe('BoardToolbar', () => {
    it('should render a label for team members, at least one team member icon, and a create button', () => {
        render(<BoardToolbar memberNames={memberNamesMock} />);

        expect(screen.getByText('Team Members:')).toBeInTheDocument();
        expect(screen.getByText('EL')).toBeInTheDocument();
        expect(screen.getByText('CC')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument();
    });
});
