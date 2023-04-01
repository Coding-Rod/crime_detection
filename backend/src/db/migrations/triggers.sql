CREATE OR REPLACE FUNCTION add_notification_one() RETURNS TRIGGER AS $$
BEGIN
    IF OLD.status <> NEW.status THEN
        INSERT INTO notifications (type, message, user_id)
        VALUES (1, CONCAT('The node ', NEW.name, ' has changed its status to ', 
            CASE WHEN NEW.status THEN 'connected' ELSE 'disconnected' END), NEW.user_id);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_nodes
AFTER UPDATE
ON nodes
FOR EACH ROW
EXECUTE FUNCTION add_notification_one();

CREATE OR REPLACE FUNCTION add_notification_two() RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO notification (type, message, user_id)
    SELECT 2, CONCAT(u.username, ' added you as a contact'), c.called
    FROM contacts c
    JOIN users u ON u.iduser = c.caller
    WHERE c.idcontact = NEW.idcontact;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER add_notification_trigger
AFTER INSERT
ON contacts
FOR EACH ROW
EXECUTE FUNCTION add_notification_two();