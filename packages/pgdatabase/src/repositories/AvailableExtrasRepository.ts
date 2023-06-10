import { pg } from '../pg';

const UUID = require('common').UUID;
const Event = require('common').Event;

const AvailableExtrasRepository = require('common').AvailableExtrasRepository;

class NodePGAvailableExtrasRepository implements InstanceType<typeof AvailableExtrasRepository> {
  public async create(event: typeof AvailableExtrasRepository): Promise<boolean> {
    try {
      const result = (
        await pg.query(
          'INSERT INTO available_attributes ( organization_id, event_id, name) VALUES ($1, $2, $3)',
          [event.organization_id, event.event_id, event.name],
        )
      ).rows[0];

      if (!result) return false;

      return result;
    } catch (err) {
      return false;
    }
  }

  public async find(
    id: typeof UUID,
    organizationId: typeof UUID,
    eventId: typeof UUID,
  ): Promise<typeof AvailableExtrasRepository | null> {
    try {
      const result = (
        await pg.query(
          'SELECT * FROM available_attributes WHERE id = $1 AND organization_id = $2 AND event_id = $3',
          [id, organizationId, eventId],
        )
      ).rows[0];

      if (!result) return null;

      return result;
    } catch (err) {
      return null;
    }
  }

  public async findAll(
    organizationId: typeof UUID,
    eventId: typeof UUID,
  ): Promise<(typeof AvailableExtrasRepository)[] | null> {
    try {
      const result = (
        await pg.query(
          'SELECT * FROM available_attributes WHERE organization_id = $1 AND event_id = $2',
          [organizationId, eventId],
        )
      ).rows[0];

      if (!result) return null;

      return result;
    } catch (err) {
      return null;
    }
  }

  public async update(event: typeof AvailableExtrasRepository): Promise<typeof Event | boolean> {
    try {
      const result = (
        await pg.query(
          'UPDATE available_attributes SET name = $1 WHERE id = $2 AND organization_id = $3 AND event_id = $4',
          [event.name, event.id, event.organization_id, event.event_id],
        )
      ).rows[0];

      if (!result) return false;

      return result;
    } catch (err) {
      return false;
    }
  }

  public async delete(
    id: typeof UUID,
    organizationId: typeof UUID,
    eventId: typeof UUID,
  ): Promise<boolean> {
    try {
      const result = (
        await pg.query(
          'DELETE FROM available_attributes WHERE id = $1 AND organization_id = $2 AND event_id = $3',
          [id, organizationId, eventId],
        )
      ).rows[0];

      if (!result) return false;

      return result;
    } catch (err) {
      return false;
    }
  }
}

export default NodePGAvailableExtrasRepository;
