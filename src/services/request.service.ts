import { getRepository, Between } from 'typeorm';
import { Request, RequestStatus } from '../entities/request.entity';

interface FilterOptions {
    date?: string;
    from?: string;
    to?: string;
}

export class RequestService {
    private get repository() {
        return getRepository(Request);
    }

    async createRequest(data: { subject: string; text: string }): Promise<Request> {
        const repo = this.repository;
        const request = repo.create(data);
        return repo.save(request);
    }

    async takeInWork(id: number): Promise<Request> {
        const repo = this.repository;
        const request = await repo.findOneOrFail({ where: { id } });
        request.status = RequestStatus.IN_PROGRESS;
        return repo.save(request);
    }

    async completeRequest(id: number, resolution: string): Promise<Request> {
        const repo = this.repository;
        const request = await repo.findOneOrFail({ where: { id } });
        request.status = RequestStatus.COMPLETED;
        request.resolution = resolution;
        return repo.save(request);
    }

    async cancelRequest(id: number, cancellationReason: string): Promise<Request> {
        const repo = this.repository;
        const request = await repo.findOneOrFail({ where: { id } });
        request.status = RequestStatus.CANCELED;
        request.cancellationReason = cancellationReason;
        return repo.save(request);
    }

    async getRequests(filters: FilterOptions): Promise<Request[]> {
        const repo = this.repository;
        const where: any = {};
        if (filters.date) {
            const date = new Date(filters.date);
            const nextDate = new Date(date);
            nextDate.setDate(date.getDate() + 1);
            where.createdAt = Between(date, nextDate);
        } else if (filters.from && filters.to) {
            where.createdAt = Between(new Date(filters.from), new Date(filters.to));
        }
        return repo.find({ where });
    }

    async cancelAllInProgress(): Promise<{ canceledCount: number }> {
        const repo = this.repository;
        const requests = await repo.find({ where: { status: RequestStatus.IN_PROGRESS } });
        for (const req of requests) {
            req.status = RequestStatus.CANCELED;
            req.cancellationReason = 'Mass cancellation';
            await repo.save(req);
        }
        return { canceledCount: requests.length };
    }
}
