import { Request as ExpressRequest, Response, Router } from 'express';
import { RequestService } from '../services/request.service';

const router = Router();
const requestService = new RequestService();

router.post('/', async (req: ExpressRequest, res: Response) => {
    try {
        const { subject, text } = req.body;
        const result = await requestService.createRequest({ subject, text });
        res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id/take', async (req: ExpressRequest, res: Response) => {
    try {
        const result = await requestService.takeInWork(Number(req.params.id));
        res.json(result);
    } catch (error: any) {
        res.status(404).json({ error: error.message });
    }
});

router.put('/:id/complete', async (req: ExpressRequest, res: Response) => {
    try {
        const { resolution } = req.body;
        const result = await requestService.completeRequest(Number(req.params.id), resolution);
        res.json(result);
    } catch (error: any) {
        res.status(404).json({ error: error.message });
    }
});

router.put('/:id/cancel', async (req: ExpressRequest, res: Response) => {
    try {
        const { cancellationReason } = req.body;
        const result = await requestService.cancelRequest(Number(req.params.id), cancellationReason);
        res.json(result);
    } catch (error: any) {
        res.status(404).json({ error: error.message });
    }
});

router.get('/', async (req: ExpressRequest, res: Response) => {
    try {
        const filters = {
            date: req.query.date as string,
            from: req.query.from as string,
            to: req.query.to as string,
        };
        const results = await requestService.getRequests(filters);
        res.json(results);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/cancel-in-progress', async (req: ExpressRequest, res: Response) => {
    try {
        const result = await requestService.cancelAllInProgress();
        res.json(result);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
