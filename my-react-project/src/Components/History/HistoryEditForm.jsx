import Card from "../Cards/Cards";

const HistoryEditForm = ({ draft, setDraft, onSave, onCancel }) => {
  return (
    <div className="edit-section-container">
      <Card>
        <div className="edit-form-content">
          <h3>Redigera session</h3>
          <div className="edit-field">
            <label>Titel</label>
            <input
              type="text"
              value={draft.title}
              onChange={e => setDraft({ ...draft, title: e.target.value })}
            />
          </div>
          <div className="edit-field">
            <label>Kategori</label>
            <input
              type="text"
              value={draft.category || ""}
              onChange={e => setDraft({ ...draft, category: e.target.value })}
            />
          </div>
          <div className="edit-buttons">
            <button className="btn-save" onClick={onSave}>Spara</button>
            <button className="btn-cancel" onClick={onCancel}>Avbryt</button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HistoryEditForm;