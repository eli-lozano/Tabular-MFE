import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import BoardToolbar from '../BoardToolbar';
import userEvent from '@testing-library/user-event';

describe('BoardToolbar', () => {
    it('should render at least one team member icon, and a create button', () => {
        render(<BoardToolbar />);

        expect(screen.getByText('EL')).toBeInTheDocument();
        expect(screen.getByText('EC')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument();
    });

    it('should call onCreate when create button is pressed', async () => {
        const onCreateMock = jest.fn();
        render(<BoardToolbar onCreate={onCreateMock} />);

        await userEvent.click(screen.getByRole('button', { name: 'Create' }));

        expect(onCreateMock).toHaveBeenCalledTimes(1);
    });

    it('should call onSave when save button is pressed', async () => {
        const onSaveMock = jest.fn();
        render(<BoardToolbar onSave={onSaveMock} />);

        await userEvent.click(screen.getByRole('button', { name: 'Save' }));

        expect(onSaveMock).toHaveBeenCalledTimes(1);
    });
});
