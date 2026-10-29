import { useState } from 'react';
import { Platform, StyleSheet, Text, TextInput, View } from 'react-native';

import { submitReview } from '../../services/reviews';
import { colors, radius, spacing, typography } from '../../theme';
import { PendingReview, Rating } from '../../types/review';
import { BottomSheet } from '../ui/BottomSheet';
import { Button } from '../ui/Button';
import { StarRating } from '../ui/StarRating';

const MAX_COMMENT = 280;

const RATING_LABELS: Record<Rating, string> = {
  1: 'Não gostei',
  2: 'Poderia ser melhor',
  3: 'Boa',
  4: 'Muito boa',
  5: 'Excelente',
};

interface ReviewSheetProps {
  /** `null` = fechada. */
  pending: PendingReview | null;
  onClose: () => void;
  onSubmitted: () => void;
}

export function ReviewSheet({ pending, onClose, onSubmitted }: ReviewSheetProps) {
  // Guarda a última experiência para o conteúdo não sumir durante a animação de fechar.
  const [shown, setShown] = useState<PendingReview | null>(pending);
  const [rating, setRating] = useState<Rating | null>(null);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  if (pending && pending.attendedId !== shown?.attendedId) {
    setShown(pending);
    setRating(null);
    setComment('');
    setError(false);
  }

  async function handleSubmit() {
    if (!shown || rating === null || submitting) return;
    setSubmitting(true);
    setError(false);
    try {
      await submitReview({ experienceId: shown.experience.id, rating, comment });
      onSubmitted();
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <BottomSheet visible={pending !== null} title="Avaliar experiência" onClose={onClose}>
      {shown ? (
        <>
          <Text style={typography.bodyMedium}>{shown.experience.title}</Text>
          <Text style={typography.caption}>{shown.experience.location}</Text>

          <View style={styles.ratingBlock}>
            <StarRating value={rating ?? 0} size={36} onChange={setRating} />
            <Text style={[typography.body, styles.ratingLabel]}>
              {rating ? RATING_LABELS[rating] : 'Toque nas estrelas para dar sua nota'}
            </Text>
          </View>

          <Text style={[typography.label, styles.fieldLabel]}>Conte como foi (opcional)</Text>
          <TextInput
            value={comment}
            onChangeText={setComment}
            multiline
            maxLength={MAX_COMMENT}
            placeholder="O que mais marcou? Para quem você recomendaria?"
            placeholderTextColor={colors.muted}
            accessibilityLabel="Comentário da avaliação"
            style={[typography.body, styles.input, Platform.OS === 'web' && styles.inputWeb]}
          />
          <Text style={[typography.caption, styles.counter]}>
            {comment.length}/{MAX_COMMENT}
          </Text>

          {error ? (
            <Text accessibilityRole="alert" style={[typography.body, styles.error]}>
              Não foi possível enviar sua avaliação. Tente novamente.
            </Text>
          ) : null}

          <View style={styles.submit}>
            <Button
              label={submitting ? 'Enviando...' : 'Publicar avaliação'}
              fullWidth
              disabled={rating === null || submitting}
              onPress={handleSubmit}
            />
          </View>
        </>
      ) : null}
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  ratingBlock: { marginVertical: spacing.lg },
  ratingLabel: { marginTop: spacing.xs },
  fieldLabel: { marginBottom: spacing.xs },
  input: {
    minHeight: 96,
    padding: spacing.sm,
    textAlignVertical: 'top',
    color: colors.ink,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.outline,
  },
  inputWeb: { outlineWidth: 0 },
  counter: { alignSelf: 'flex-end', marginTop: spacing.xxs },
  error: { color: '#9B2C2C', marginTop: spacing.xs },
  submit: { marginTop: spacing.lg },
});
